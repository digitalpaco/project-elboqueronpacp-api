import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { hashSync } from 'bcryptjs'
@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number
    @Column({type: 'varchar', nullable: true, length: 255})
    name?: string

    @Column({name: 'last_name', type: 'varchar', length: 255, nullable: true})
    lastName: string

    @Column({type:'varchar', length: 50, nullable: false, unique: true})
    username: string

    @Column({ type:'varchar', length: 255, nullable: false, unique: true})
    email: string

    @Column({type:'varchar', length: 128, nullable: false, select: false})
    password: string
    @Column({type: 'simple-array'})
    roles: string[]

    @Column({ type: 'bool', default: true })
    status: boolean

    @CreateDateColumn({ name: 'created_at', type:'timestamp'})
    createdAt: Date

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (!this.password) return 
        this.password = await hashSync(this.password, 15)
    }
}
