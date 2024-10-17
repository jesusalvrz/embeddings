<script lang="ts">
    import { onMount } from 'svelte';
    let input = ''; // Para almacenar el mensaje del usuario
    let messages: { role: string; content: string }[] = []; // Para almacenar los mensajes (del usuario y de la IA)
    let isLoading = false; // Para manejar el estado de carga
  
    // Función para enviar el mensaje al backend (route.ts)
    const sendMessage = async () => {
      if (!input.trim()) return;
  
      // Añadir el mensaje del usuario al array de mensajes
      messages = [...messages, { role: 'user', content: input }];
      const userMessage = input; // Guardar el mensaje del usuario
      input = ''; // Limpiar el input
  
      // Marcar que estamos esperando una respuesta
      isLoading = true;
  
      // Hacer la llamada al backend
      try {
        const response = await fetch('src/api/chat/route.ts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messages: [...messages, { role: 'user', content: userMessage }]
          })
        });
  
        const data = await response.json();
  
        // Agregar la respuesta de la IA al array de mensajes si tiene contenido
        if (data.message) {
          messages = [...messages, { role: 'assistant', content: data.message }];
        }
      } catch (error) {
        console.error('Error fetching AI response:', error);
      } finally {
        isLoading = false;
      }
    };
  
    // Función para manejar el envío del formulario
    const handleSubmit = async (e: Event) => {
      e.preventDefault();
      await sendMessage();
    };
  </script>
  
  <!-- Interfaz -->
  <main class="chat-container">
    <div class="messages">
      {#each messages as message}
        <div class={`message ${message.role}`}>
          <p>{message.content}</p>
        </div>
      {/each}
    </div>
  
    <form on:submit={handleSubmit} class="input-form">
      <input
        bind:value={input}
        type="text"
        placeholder="Escribe tu mensaje..."
        class="input-box"
        required
      />
      <button type="submit" class="send-button" disabled={isLoading}>Enviar</button>
    </form>
  
    {#if isLoading}
      <p>Cargando respuesta...</p>
    {/if}
  </main>
  
  <style>
    .chat-container {
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 0 auto;
      padding: 2rem;
    }
    .messages {
      flex-grow: 1;
      margin-bottom: 1rem;
      overflow-y: auto;
      border: 1px solid #ccc;
      padding: 1rem;
      border-radius: 8px;
    }
    .message {
      margin-bottom: 1rem;
    }
    .message.user {
      text-align: right;
    }
    .message.assistant {
      text-align: left;
    }
    .input-form {
      display: flex;
      gap: 0.5rem;
    }
    .input-box {
      flex-grow: 1;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .send-button {
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .send-button:disabled {
      background-color: #aaa;
      cursor: not-allowed;
    }
  </style>
  