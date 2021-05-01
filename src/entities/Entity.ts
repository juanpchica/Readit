import { classToPlain, Exclude } from "class-transformer";
import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export default abstract class Entity extends BaseEntity {
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @UpdateDateColumn()
    updatedAt: Date

    @CreateDateColumn()
    createdAt: Date

    toJSON(){
        return classToPlain(this);  
    }
}