# Contribuindo para o Projeto

Obrigado por considerar contribuir para este projeto! 🎉

## Como Contribuir

### 1. Reportar Bugs

Se você encontrou um bug:

1. Verifique se o bug já não foi reportado nas [Issues](../../issues)
2. Se não encontrou, crie uma nova issue com:
   - Título claro e descritivo
   - Descrição detalhada do problema
   - Passos para reproduzir
   - Comportamento esperado vs atual
   - Screenshots, se aplicável
   - Informações do ambiente (OS, versões, etc)

### 2. Sugerir Melhorias

Para sugerir melhorias:

1. Abra uma issue com a tag `enhancement`
2. Descreva claramente:
   - Qual problema a melhoria resolve
   - Por que ela seria útil
   - Exemplos de uso, se possível

### 3. Contribuir com Código

#### Pré-requisitos

- Node.js >= 16.x
- Git
- Conhecimento de JavaScript, WebdriverIO e Appium

#### Processo

1. **Fork** o repositório
2. **Clone** seu fork:
   ```bash
   git clone https://github.com/seu-usuario/webdriveio.git
   cd webdriveio
   ```

3. **Crie uma branch** para sua feature/fix:
   ```bash
   git checkout -b feature/minha-feature
   # ou
   git checkout -b fix/meu-fix
   ```

4. **Instale as dependências**:
   ```bash
   npm install
   ```

5. **Faça suas alterações** seguindo os padrões do projeto

6. **Execute os testes**:
   ```bash
   npm test
   ```

7. **Commit suas mudanças**:
   ```bash
   git add .
   git commit -m "feat: adiciona nova funcionalidade X"
   ```
   
   Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` Nova funcionalidade
   - `fix:` Correção de bug
   - `docs:` Mudanças na documentação
   - `test:` Adicionar ou modificar testes
   - `refactor:` Refatoração de código
   - `style:` Mudanças de formatação
   - `chore:` Tarefas de manutenção

8. **Push para seu fork**:
   ```bash
   git push origin feature/minha-feature
   ```

9. **Abra um Pull Request** no repositório original

## Padrões de Código

### JavaScript

- Use ES6+ features
- Use async/await para operações assíncronas
- Evite callbacks aninhados
- Use arrow functions quando apropriado
- Mantenha funções pequenas e focadas

### Page Objects

- Um arquivo por tela/página
- Separe seletores de ações
- Use nomes descritivos
- Documente métodos públicos com JSDoc

```javascript
/**
 * Realiza login no sistema
 * @param {string} username - Nome de usuário
 * @param {string} password - Senha
 */
async login(username, password) {
    // implementação
}
```

### Testes

- Um arquivo de teste por feature/tela
- Use describe/it do Mocha
- Nomes descritivos e claros
- Siga o padrão AAA (Arrange, Act, Assert)
- Adicione informações Allure

```javascript
describe('Feature X', () => {
    it('Deve fazer Y quando Z', async () => {
        // Arrange
        // Act
        // Assert
    });
});
```

### Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[rodapé opcional]
```

Exemplos:
```
feat: adiciona teste de recuperação de senha
fix: corrige seletor do botão de login
docs: atualiza README com instruções de iOS
test: adiciona testes de validação de campos
```

## Código de Conduta

- Seja respeitoso com todos os contribuidores
- Aceite críticas construtivas
- Foque no que é melhor para o projeto
- Seja paciente com novos contribuidores

## Dúvidas?

Se tiver dúvidas sobre como contribuir:

1. Verifique a [documentação](README.md)
2. Procure em [issues existentes](../../issues)
3. Abra uma issue com suas dúvidas

## Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto (MIT).

---

**Obrigado por contribuir! 🚀**
