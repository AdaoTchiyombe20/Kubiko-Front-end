import { Box, Tabs, Text } from '@radix-ui/themes';

export default function Tab() {
  return (
    <Tabs.Root defaultValue="account">
      <Tabs.List>
        <Tabs.Trigger value="account">Comprar</Tabs.Trigger>
        <Tabs.Trigger value="documents">Alugar</Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  )
}
