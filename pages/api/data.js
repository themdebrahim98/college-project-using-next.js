

export default function handler(req, res) {
  const data = {
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com"
  };

  res.status(200).json(data);
}