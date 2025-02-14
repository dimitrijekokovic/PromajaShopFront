import Center from '@/components/Center';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
  return (
    <>
      <Header />
      <Center>
        <RegisterForm />
      </Center>
      <Footer/>
    </>
  );
}
