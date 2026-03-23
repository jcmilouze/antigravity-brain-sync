async function testModels() {
  try {
    const response = await fetch('http://localhost:1234/v1/models');
    const result = await response.json();
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
}
testModels();
