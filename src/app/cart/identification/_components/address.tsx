"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCreateAddress } from "@/hooks/mutations/use-create-address";
import { useUserAddresses } from "@/hooks/queries/use-user-addresses";

const addressFormSchema = z.object({
  email: z.email("Email inválido"),
  fullName: z.string().min(1, "Nome completo é obrigatório"),
  cpf: z.string().min(14, "CPF inválido"),
  phone: z.string().min(1, "Celular é obrigatório"),
  cep: z.string().min(1, "CEP é obrigatório"),
  address: z.string().min(1, "Endereço é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
});

type AddressFormValues = z.infer<typeof addressFormSchema>;

const Address = () => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      email: "",
      fullName: "",
      cpf: "",
      phone: "",
      cep: "",
      address: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
    },
  });

  const createAddressMutation = useCreateAddress();
  const { data: addresses, isLoading: isLoadingAddresses } = useUserAddresses();

  const onSubmit = async (data: AddressFormValues) => {
    await createAddressMutation.mutateAsync(data);
    form.reset();
    setSelectedAddress(null);
  };

  console.log(selectedAddress);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
          <div className="space-y-4">
            {addresses?.map((address) => (
              <Card key={address.id}>
                <CardContent>
                  <div className="flex items-center gap-3 hover:cursor-pointer">
                    <RadioGroupItem value={address.id} id={address.id} />
                    <Label
                      htmlFor={address.id}
                      className="flex items-center gap-2 font-medium text-black"
                    >
                      {address.address}, {address.number}
                      {address.complement
                        ? ` - ${address.complement}`
                        : ""}, {address.neighborhood} - {address.city}/
                      {address.state}, CEP: {address.cep}
                    </Label>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="add_new" id="add_new" />
                  <Label htmlFor="add_new">Adicionar novo endereço</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </RadioGroup>

        {selectedAddress === "add_new" && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-4 space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Digite seu email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite seu nome completo"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cpf"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <PatternFormat
                        {...field}
                        customInput={Input}
                        placeholder="Digite seu CPF"
                        format="###.###.###-##"
                        value={value}
                        onValueChange={({ formattedValue }) => {
                          onChange(formattedValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Celular</FormLabel>
                    <FormControl>
                      <PatternFormat
                        customInput={Input}
                        placeholder="Digite seu celular"
                        format="(##) #####-####"
                        value={field.value}
                        onValueChange={(values) => {
                          field.onChange(values.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cep"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <PatternFormat
                        customInput={Input}
                        placeholder="Digite seu CEP"
                        format="#####-###"
                        value={field.value}
                        onValueChange={(values) => {
                          field.onChange(values.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Digite seu endereço" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Digite o número" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="complement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complemento</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite o complemento (opcional)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="neighborhood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Digite o bairro" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Digite a cidade" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Digite o estado" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={createAddressMutation.isPending}
              >
                {createAddressMutation.isPending
                  ? "Salvando..."
                  : "Salvar endereço"}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default Address;
