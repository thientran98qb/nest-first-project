import { Injectable } from "@nestjs/common"

@Injectable()
export class HelperService {
    titleCase = (title: string) => {
        return title.toLowerCase().replace(/(^|\s)\S/g, (string) => string.toUpperCase())
    }
}
