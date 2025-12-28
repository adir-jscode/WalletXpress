import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  phone: z.string().min(11, { message: "Phone number must be 11 characters." }),
  amount: z.coerce.number().min(1, { message: "Amount must be at least 1." }),
});

export default function SendMoneyForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      amount: 0,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={
                        field.value.startsWith("+880")
                          ? field.value
                          : `+880${field.value}`
                      }
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.startsWith("880")) {
                          field.onChange("+" + value);
                        } else {
                          field.onChange("+880" + value);
                        }
                      }}
                      placeholder="+8801XXXXXXXXX"
                      className="h-10 rounded-lg border-slate-200 dark:border-slate-700"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Send Money</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
