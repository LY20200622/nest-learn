import { Injectable } from '@nestjs/common';
import { IInnerItem } from './interface';

@Injectable()
export class AppService {
    private readonly innerArr: Array<IInnerItem> = [];

    getHello(): string {
        return 'Hello World!';
    }

    addInnerItem(item: IInnerItem) {
        this.innerArr.push(item);
    }

    popInnerItem(): IInnerItem {
        return this.innerArr.pop();
    }
}
