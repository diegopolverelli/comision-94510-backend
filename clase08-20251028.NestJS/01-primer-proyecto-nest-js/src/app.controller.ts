import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Logger, ParseIntPipe, Post, Query, Req, ValidationPipe } from '@nestjs/common';
import { AppService, CreateUser } from './app.service';

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("saludo")
  getHello(@Query("name") nombre: string, @Req() req,  @Query("numero", new ParseIntPipe({optional:true, })) numero:number): string {
    console.log(nombre)
    console.log(numero, typeof numero)

    console.log(req.headers)
    console.log(req.url)
    console.log(req.method)

    Logger.verbose(`Mensaje de prueba`, `Controller-getHello`)

    // console.log(req)
    return this.appService.getHello();
  }

  @Post("user")
  createUser(@Body(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true})) user:CreateUser){
    console.log(`Ingresó a createUser`)
    console.log(user)

    // return {
    //   id:1, name:"Juan"
    // }
    let {name, email, age}=user
    if(!name || !email){
      throw new BadRequestException(`name | email son requeridos`)
    }

    if(age!>5){
      console.log(`age=5`)
    }

    if(age && age<18){
      throw new HttpException('Tienes que ser mayor de edad', HttpStatus.BAD_REQUEST);
    }

    return this.appService.creaUser(user)
  }
}


// const a1=new AppController()
// a1.getHello()