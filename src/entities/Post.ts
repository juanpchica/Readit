import { BeforeInsert, Column, Entity as TOEntity, Index, JoinColumn, ManyToOne} from "typeorm";
import { makeid, slugify } from "../util/helper";
import Entity from "./Entity";
import User from "./User";

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

    @JoinColumn({ name: 'username', referencedColumnName: 'username' })
    @ManyToOne(() => User, user => user.posts)
    user: User;

    @BeforeInsert()
    makeIdAndSlug(){
        this.identifier = makeid(7);
        this.slug = slugify(this.title);
    }
}