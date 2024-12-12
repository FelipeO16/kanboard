# KanBoard

**KanBoard** é uma aplicação estilo **Kanban** desenvolvida para organização de tarefas. Com uma interface moderna, funcional e intuitiva, permite gerenciar listas de tarefas com suporte a operações como **Undo/Redo**, adição/remoção de colunas e tarefas, além da funcionalidade de copiar tarefas rapidamente.

[KanBoard Web](https://kanboard.nuxt.dev/)

![image](https://github.com/user-attachments/assets/fcb0df6a-8bb8-4a01-8a03-55997bbff5ee)


---

## Tecnologias Utilizadas
- **Nuxt 4** - Framework Vue.js de alto desempenho para SSR e SSG.
- **TailwindCSS** - Framework moderno de CSS para estilização rápida.
- **PrimeVue** - Biblioteca de componentes UI.
- **VueUse** - Coleção de utilities para Vue.
---

## Funcionalidades Principais

1. **Criação e remoção de colunas**  
   Adicione colunas personalizadas com atalhos no teclado (**Ctrl + B**).

2. **Adição e remoção de tarefas**  
   É possível adicionar tarefas em qualquer coluna e deletá-las com um simples clique (**Click + X**).

3. **Funcionalidade de Undo/Redo**  
   Implemente a famosa funcionalidade de "Desfazer e Refazer" com atalhos (**Ctrl + Z** e **Ctrl + Y**).

4. **Copiar tarefas**  
   Copie rapidamente uma tarefa usando **Alt + Click**.

5. **Persistência de dados**  
   Todos os dados são salvos no **Local Storage**, garantindo que suas tarefas não se percam ao atualizar a página.

---

## Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/KanBoard.git
   cd KanBoard
   ```

2. Instale as dependências:
   ```bash
   pnpm install
   ```

3. Execute o servidor de desenvolvimento:
   ```bash
   pnpm run dev
   ```

4. Acesse no navegador:
   ```
   http://localhost:3000
   ```

---

## Atalhos Rápidos (Keyboard Shortcuts)

| Função             | Atalho       |
|------------------------|--------------|
| Adicionar Coluna       | `Ctrl + B`   |
| Deletar Coluna         | `Backspace`  |
| Adicionar Tarefa       | `+ Add Card` |
| Deletar Tarefa         | `Click + X`  |
| Copiar Tarefa          | `Alt + Click`|
| Undo (Desfazer)        | `Ctrl + Z`   |
| Redo (Refazer)         | `Ctrl + Y`   |

---

## Estrutura do Projeto

```plaintext
kanboard/
├── assets/            # Imagens e recursos estáticos
├── components/        # Componentes reutilizáveis
├── layouts/           # Layouts do projeto
├── pages/             # Páginas da aplicação
├── plugins/           # Plugins configurados
├── store/             # Gerenciamento de estado com Pinia
├── nuxt.config.js     # Configuração do Nuxt
└── package.json       # Dependências e scripts
```

---

## Screenshot

![image](https://github.com/user-attachments/assets/facf476d-7b44-4c99-b847-d588e6a13ec9)


---

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e enviar pull requests.

1. Faça um fork do projeto
2. Crie uma branch:
   ```bash
   git checkout -b minha-feature
   ```
3. Commit suas alterações:
   ```bash
   git commit -m "feat: Minha nova feature"
   ```
4. Push para sua branch:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request

---

## Licença
Este projeto está licenciado sob a **MIT License**. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

## Contato
**GitHub**: [FelipeO16](https://github.com/FelipeO16)  
**LinkedIn**: [Felipe Oliveira](https://linkedin.com/in/felipe--)
