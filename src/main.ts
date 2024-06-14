import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('star-wars')
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('Star Wars')
    .setDescription(`Cette API permet de manipuler des types de personnages de l'univers de Star Wars.
      Elle permet également d'obtenir des informations sur des guerres et des batailles en fonctionn de troupes disponibles sur ces champs de batailles.
      Une gestion d'authentification est également disponible.`)
    .setVersion('1.0.0')
    .build()

  app.enableVersioning({ type: VersioningType.URI })
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  app.enableCors()
  await app.listen(3000)

  const logger = new Logger('bootstrap')
  logger.log(`Listening on ${await app.getUrl()}/star-wars`)
  logger.log(`API documentation available on ${await app.getUrl()}/api`)
}
bootstrap()
