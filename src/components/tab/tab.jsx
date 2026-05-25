import { Box, Tabs, Text } from '@radix-ui/themes';

export default function Tab() {
  return (
    <Tabs.Root defaultValue="Todos">
      <Tabs.List>
        <Tabs.Trigger 
          value="Todos"
          onClick={() => {
            
          }}
        >
          Todos
        </Tabs.Trigger>
        <Tabs.Trigger 
          value="Comprar"
          onClick={() => {

          }}
        >
          Comprar
        </Tabs.Trigger>
        <Tabs.Trigger 
          value="Alugar"
          onClick={() => {

          }}
        >
          Alugar
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  )
}
