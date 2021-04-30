import { IsEmail, Length } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index, CreateDateColumn, UpdateDateColumn, BeforeInsert} from "typeorm";

import bcrypt from "bcrypt";
import {Exclude,classToPlain} from "class-transformer"
@Entity("users")
export class User extends BaseEntity {

    constructor(user: Partial<User>){
        super();
        Object.assign(this,user);
    }

    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @IsEmail()
    @Index()
    @Column({unique:true})
    email: string

    @Length(3,255,{message: "Username must be atleast 3 characteres long"})
    @Index()
    @Column({unique:true})
    username: string

    @Exclude()
    @Length(6,255)
    @Column()
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password,6);
    }

    toJSON(){
        return classToPlain(this);  
    }
}
