import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("users")
export class User extends BaseEntity {

    constructor(user: Partial<User>){
        super();
        Object.assign(this,user);
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    email: string

    @Column({unique:true})
    username: string

    @Column()
    password: string

}
