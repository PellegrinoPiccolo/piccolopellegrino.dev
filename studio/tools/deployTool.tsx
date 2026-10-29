import {useState, type FormEvent} from 'react'
import type {Tool} from 'sanity'
import {RocketIcon} from '@sanity/icons/Rocket'
import {Button, Card, Container, Heading, Stack, Text, TextInput} from '@sanity/ui'

const DEPLOY_URL = 'https://deploy.piccolopellegrino.dev'

type Status = 'idle' | 'loading' | 'success' | 'unauthorized' | 'error'

function DeployTool() {
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const deploy = async (event: FormEvent) => {
    event.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(DEPLOY_URL, {
        method: 'POST',
        headers: {Authorization: `Bearer ${password}`},
      })
      if (res.status === 401) {
        setStatus('unauthorized')
        return
      }
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) setPassword('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <Container width={1} padding={5}>
      <form onSubmit={deploy}>
        <Stack gap={5}>
          <Heading as="h1" size={3}>
            Aggiorna Sito
          </Heading>
          <Text muted>
            Avvia una nuova build del sito per pubblicare le modifiche ai progetti.
          </Text>
          <Stack gap={3}>
            <Text as="label" htmlFor="deploy-password" size={1} weight="semibold">
              Password
            </Text>
            <TextInput
              id="deploy-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </Stack>
          <Button
            type="submit"
            icon={RocketIcon}
            text="Aggiorna sito"
            tone="primary"
            padding={4}
            loading={status === 'loading'}
            disabled={!password}
          />
          {status === 'success' && (
            <Card padding={4} radius={2} tone="positive">
              <Text>Build avviata. Il sito sarà aggiornato tra qualche minuto.</Text>
            </Card>
          )}
          {status === 'unauthorized' && (
            <Card padding={4} radius={2} tone="critical">
              <Text>Password errata.</Text>
            </Card>
          )}
          {status === 'error' && (
            <Card padding={4} radius={2} tone="critical">
              <Text>Impossibile avviare la build. Riprova.</Text>
            </Card>
          )}
        </Stack>
      </form>
    </Container>
  )
}

export const deployTool: Tool = {
  name: 'aggiorna-sito',
  title: 'Aggiorna Sito',
  icon: RocketIcon,
  component: DeployTool,
}
