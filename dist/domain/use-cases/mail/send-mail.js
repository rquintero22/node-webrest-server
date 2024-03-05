"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMail = void 0;
class SendMail {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.send(dto);
    }
}
exports.SendMail = SendMail;
