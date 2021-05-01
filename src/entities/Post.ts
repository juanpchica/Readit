import { Column, Entity as TOEntity, Index} from "typeorm";
import Entity from "./Entity";

@TOEntity("posts")
export class Post extends Entity{
    
    constructor(post: Partial<Post>){
        super();
        Object.assign(this,post);
    }

    @Index()
    @Column()
    identifier: string // 7 Character Id

    @Column()
    title: string

    @Index()
    @Column()
    slug: string

    @Column({ nullable: true, type: 'text' })
    body: string

    @Column()
    subName: string
}