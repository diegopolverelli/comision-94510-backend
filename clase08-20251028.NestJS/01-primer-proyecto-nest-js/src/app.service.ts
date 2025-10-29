import { Injectable } from '@nestjs/common';
import { IsEmail, IsNumber, IsOptional, IsString, IsStrongPassword } from 'class-validator';

class User{
  id:number
  name: string
  email: string
  password: string
  age?: number
}

export class CreateUser{

  @IsString({message:`La propiedad name debe ser de tipo string`})
  name: string

  @IsEmail()
  email: string

  @IsStrongPassword()
  password: string

  @IsNumber()
  @IsOptional()
  age?: number
}

@Injectable()
export class AppService {

  usuarios:User[]=[]
  constructor(){
    this.usuarios=[]
  }

  getHello(): string {
    return 'Hello World!';
  }

  creaUser(user:CreateUser){
    let id=1
    if(this.usuarios.length>0){
      id=Math.max(...this.usuarios.map(d=>d.id))+1
    }
    
    let nuevoUsuario={
      id, 
      ...user
    }

    // this.usuarios.push()
    this.usuarios.push(nuevoUsuario)

    return nuevoUsuario

  }
}
