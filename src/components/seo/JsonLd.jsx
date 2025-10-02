import { SCHEMA_ORG } from '@/utils/constants'

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ORG) }}
    />
  )
}