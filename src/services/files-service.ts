import { env } from '@/env.js'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'node:crypto'
import type { Readable } from 'node:stream'
interface FileUploadProps {
  file: Readable
  filename: string
  mimetype: string
}

export async function uploadFile({
  file,
  filename,
  mimetype,
}: FileUploadProps) {
  const urlBase = `https://${env.AWS_S3_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com`

  const s3Client = new S3Client({
    region: env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
    },
  })

  const prefix = 'movies'

  const id = randomUUID()
  const key = `${prefix}/${id}`

  const chunks: Buffer[] = []
  for await (const chunk of file) {
    chunks.push(chunk)
  }
  const buffer = Buffer.concat(chunks)

  const command = new PutObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME!,
    Key: key,
    Body: buffer,
    ContentType: mimetype,
  })

  try {
    await s3Client.send(command)
    return {
      id,
      url: `${urlBase}/${key}`,
      fileName: filename,
      size: buffer.length,
      mimeType: mimetype,
    }
  } catch (error) {
    throw new Error(`Erro ao fazer upload: ${(error as Error)?.message}`)
  }
}
