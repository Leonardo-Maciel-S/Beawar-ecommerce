import { Button } from "@/components/ui/button";

const Home = () => {
  const teste = ["adicionar"];

  return (
    <div>
      {teste.map((item) => (
        <Button key={item}>{item}</Button>
      ))}
    </div>
  );
};

export default Home;
