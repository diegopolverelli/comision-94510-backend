import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("saludo")
  getHello(@Query("name") nombre: string, @Req() req): string {
    console.log(nombre)

    console.log(req.headers)
    console.log(req.url)
    console.log(req.method)

    // console.log(req)
    return this.appService.getHello();
  }

  @Post("user")
  createUser(@Body() user){
    console.log(`Ingresó a createUser`)
    console.log(user)

    return {
      id:1, name:"Juan"
    }
  }
}


// const a1=new AppController()
// a1.getHello()