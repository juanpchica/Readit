import { Expose } from "class-transformer";
import {
  BeforeInsert,
  Column,
  Entity as TOEntity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { makeid, slugify } from "../util/helper";
import Comment from "./Comment";
import Entity from "./Entity";
import Sub from "./Sub";
import User from "./User";

@TOEntity("posts")
export default class Post extends Entity {
  constructor(post: Partial<Post>) {
    super();
    Object.assign(this, post);
  }

  @Index()
  @Column()
  identifier: string; // 7 Character Id

  @Column()
  title: string;

  @Index()
  @Column()
  slug: string;

  @Column({ nullable: true, type: "text" })
  body: string;

  @Column()
  subName: string;

  @Column()
  username: string;

  @JoinColumn({ name: "username", referencedColumnName: "username" })
  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @ManyToOne(() => Sub, (sub) => sub.posts)
  @JoinColumn({ name: "subName", referencedColumnName: "name" })
  sub: Sub;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Expose()
  get url(): string {
    return `/r/${this.subName}/${this.identifier}/${this.slug}`;
  }

  // protected url: string
  // @AfterLoad()
  // createFields() {
  //   this.url = `/r/${this.subName}/${this.identifier}/${this.slug}`
  // }

  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = makeid(7);
    this.slug = slugify(this.title);
  }
}
