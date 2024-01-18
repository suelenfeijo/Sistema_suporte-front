export interface Cliente{
    //a ? define que pode ser um dado que possa ou não estar presente, e o any, qualquer (string ou número)
    id?: any;
    nome:string;
    cpf: string;
    email:string;
    senha:string;
    perfis:string[];
    dataCriacao: any;

}