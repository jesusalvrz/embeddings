<script lang="ts">
    let prompt = '';
    let response = '';
    let isLoading = false;

    async function handleSubmit() {
        isLoading = true;
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });
            const data = await res.json();
            response = data.result;
        } catch (error) {
            console.error('Error:', error);
            response = 'Ocurrió un error al procesar tu solicitud.';
        } finally {
            isLoading = false;
        }
    }
</script>

<main class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Interfaz Groq</h1>
    
    <form on:submit|preventDefault={handleSubmit} class="mb-4">
        <textarea
            bind:value={prompt}
            placeholder="Escribe tu prompt aquí..."
            class="w-full p-2 border rounded"
            rows="4"
        ></textarea>
        <button
            type="submit"
            class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={isLoading}
        >
            {isLoading ? 'Procesando...' : 'Enviar'}
        </button>
    </form>

    {#if response}
        <div class="mt-4">
            <h2 class="text-xl font-semibold mb-2">Respuesta:</h2>
            <p class="p-4 bg-gray-100 rounded">{response}</p>
        </div>
    {/if}
</main>