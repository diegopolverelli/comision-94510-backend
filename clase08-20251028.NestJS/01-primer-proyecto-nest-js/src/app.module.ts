import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { ClientesModule } from './clientes/clientes.module';

@Module({
  imports: [ProductosModule, ClientesModule],
  controllers: [AppController],
  providers: [AppService],
  exports:[]
})
export class AppModule {}
