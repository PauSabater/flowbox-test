
export async function get({ params, request }: { params: { category: string }, request: Request }) {
    const { category } = params;

    let data;

    try {
      // Dynamically import the JSON file based on the category
      data = await import(`../../data/${category}.json`);
    } catch (error) {
      // Handle errors if the import fails, such as file not found
      return {
        status: 404,
        body: JSON.stringify({ error: 'Category not found' }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }

    return {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }


  }

  export function getStaticPaths() {
    return [
      { params: { category: "architecture"} },
      { params: { category: "1"} },
      { params: { category: "2"} },
      { params: { category: "3"} }
    ]
  }