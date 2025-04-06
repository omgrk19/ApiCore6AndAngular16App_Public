
interface IAccount {
    cname: string,
    csalary: number,
    cstatus?: string | null
    deposite?: () => void,
    withdraw: () => void
}

class class1 implements IAccount {
    cname: string = "";
    csalary: number = 0;
    cstatus?: string | null | undefined;    
    withdraw(): void
    {

    }
}
