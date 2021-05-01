import { IsEmail, Length } from "class-validator";
import {Entity as TOEntity, Column, BaseEntity, Index, BeforeInsert, OneToMany} from "typeorm";

import bcrypt from "bcrypt";
import {Exclude} from "class-transformer"

import Entity from "./Entity"
import { Post } from "./Post";

@TOEntity("users")
export default class User extends Entity {

    constructor(user: Partial<User>){
        super();
        Object.assign(this,user);
    }

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

    @OneToMany(() => Post, post => post.user)
    posts: Post[];

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password,6);
    }
}
