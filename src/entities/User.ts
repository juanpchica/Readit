import { IsEmail, Min } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity("users")
export class User extends BaseEntity {

    constructor(user: Partial<User>){
        super();
        Object.assign(this,user);
    }
    @PrimaryGeneratedColumn()
    id: number;

    @IsEmail()
    @Index()
    @Column({unique:true})
    email: string

    @Min(3)
    @Index()
    @Column({unique:true})
    username: string

    @Min(6)
    @Column()
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date


}
