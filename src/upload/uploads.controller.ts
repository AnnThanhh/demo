import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { ApiConsumes, ApiOkResponse, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private uploadsService: UploadsService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse({
    schema: { example: { url: 'https://res.cloudinary.com/...jpg' } },
  })
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const url = await this.uploadsService.uploadImage(file);
    return { url };
  }

  @Post('images')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiOkResponse({
    schema: {
      example: {
        urls: [
          'https://res.cloudinary.com/...1.jpg',
          'https://res.cloudinary.com/...2.jpg',
        ],
      },
    },
  })
  async uploadImages(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<{ urls: string[] }> {
    const urls = await Promise.all(
      files.map((file) => this.uploadsService.uploadImage(file)),
    );
    return { urls };
  }
}
