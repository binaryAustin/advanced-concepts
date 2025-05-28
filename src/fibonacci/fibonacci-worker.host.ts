import { OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { join } from 'path';
import { Observable, filter, firstValueFrom, fromEvent, map } from 'rxjs';

export class FibonacciWorkerHost
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private worker: Worker;
  private message$: Observable<{ id: string; result: number }>;

  onApplicationBootstrap() {
    this.worker = new Worker(join(__dirname, 'fibonacci.worker.js'));
    this.message$ = fromEvent(this.worker, 'message') as unknown as Observable<{
      id: string;
      result: number;
    }>;
  }

  async onApplicationShutdown(signal?: string) {
    this.worker.terminate();
  }

  run(n: number) {
    const uniqueId = randomUUID();
    this.worker.postMessage({ n, id: uniqueId });

    return firstValueFrom(
      // convert observable to a promise
      this.message$.pipe(
        filter(({ id }) => id === uniqueId), // filter out messages by id
        map(({ result }) => result), // extract the result value
      ),
    );
  }
}
