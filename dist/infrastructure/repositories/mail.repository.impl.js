"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailRepositoryImpl = void 0;
class MailRepositoryImpl {
    constructor(datasource) {
        this.datasource = datasource;
    }
    send(options) {
        return this.datasource.send(options);
    }
}
exports.MailRepositoryImpl = MailRepositoryImpl;
