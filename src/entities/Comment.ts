import { Entity as TOEntity, Column, Index, ManyToOne, JoinColumn, BeforeInsert } from "typeorm";
import { makeid } from "../util/helper";
import Entity from "./Entity";
import Post from "./Post";
import User from "./User";

@TOEntity("comments")
export default class Comment extends Entity{
    constructor(comment: Partial<Comment>){
        super();
        Object.assign(this,comment);
    }

    @Index()
    @Column()
    identifier: string

    @Column()
    body: string

    @Column()
    username: string

    @ManyToOne(() => User)
    @JoinColumn({ name: 'username', referencedColumnName: 'username' })
    user: User

    @ManyToOne(() => Post, (post) => post.comments, { nullable: false })
    post: Post

    @BeforeInsert()
    makeIdAndSlug() {
        this.identifier = makeid(8)
    }
}