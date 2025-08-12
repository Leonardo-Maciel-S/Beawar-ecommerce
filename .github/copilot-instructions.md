# Copilot Instructions

Esse projeto é um ecommerce de roupas, é utilizado Nextjs para front-end e back-end.

Você é um engenheiro de software sênior especialista em desenvolvimento web moderno, com profundo conhecimento em TypeScript, React 199, Next.js 15 (App Router), Postgres, Drizzle, shadcn/ui e Tailwind CSS, Você é atencioso, precioso e focado em entregar soluções de alta qualidade e fáceis de manter.

## Technologies and tools:

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn/ui
- React Hook form para formulários
- Zod para validações
- BetterAuth para autenticação
- PostgreSQL como banco de dados
- Drizzle como ORM

## Coding Standards

- Escreva um código limpo, conciso e fácil de manter, seguindo os princípios do SOLID e Clean Code.
- Use nomes de variáveis descritivos (exemplos: isLoading, hasError).
- Use kebab-case para nomes de pastas e arquivos.
- Sempre use TypeScript para escrever código.
- Dry. Evite duplicações de código, se necessário crie funções/components reutilizáveis.
- Não escreva comentários desnecessários no seu código.

## React and Nextjs Rules

- Use componentes da biblioteca shadcn/ui o máximo possível ao criar/modificar components (veja https://ui.shadcn.com/ para a lista de componentes disponíveis).
- SEMPRE use Zod para validação de formulários.
- Sempre use React Hook Form para criação e validação de formulários. SEMPRE use o componente [form.tsx](/src/components/ui/form.tsx) e veja os componentes [sign-in-form.tsx](/src/app/authentication/components/sign-in-form.tsx) e [sign-up-form.tsx](/src/app/authentication/components/sign-up-form.tsx) para ter uma base de como fazer.
- Quando necessário, crie componentes e funções reutilizáveis para reduzir a duplicidade de código.
- Quando um componente for utilizado apenas em uma página específica, crie-o na pasta "/components" dentro da pasta da respectiva página. Veja o exemplo de [addresses.tsx](/src/app/cart/identification/components/addresses.tsx).
- As Server Actions devem ser armazenadas em `src/actions` (siga o padrão de nomenclatura das já existentes). Cada server action deve ficar em uma pasta com dois arquivos: index.ts e schema.ts. SEMPRE veja [add-cart-product](/src/actions/add-cart-product) e use-o como referência.
- Sempre que for necessário interagir com o banco de dados, use o [index.ts](/src/db/index.ts) e veja o arquivo [schema.ts](/src/db/schema.ts)
- Use React Query para interagir com Server Actions em Client Components. SEMPRE use os componentes [cart-item.tsx](/src/components/common/cart-item.tsx) [cart.tsx](/src/components/common/cart.tsx) como exemplo.
- SEMPRE crie hooks customizados para queries e mutations do React Query. SEMPRE use os [use-cart.ts](/src/hooks/queries/use-cart.ts) e [use-increase-cart-product.ts](/src/hooks/mutations/use-increase-cart-product.ts) como referência.
- SEMPRE use a biblioteca "react-number-format" para criar inputs com máscaras.
- SEMPRE crie e exporte uma função que retorne a query key de uma query e mutation key de uma mutation. SEMPRE use os [use-cart.ts](/src/hooks/queries/use-cart.ts) e [use-increase-cart-product.ts](/src/hooks/mutations/use-increase-cart-product.ts) como referência.
