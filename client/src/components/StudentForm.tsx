import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
} from 'src/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form"
import { Button } from "src/components/ui/button"
import { Input } from "src/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { createStudent, editStudent } from '../lib/actions/student.actions';
// Zod schema for validation
const studentSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  grade: z.string().refine((val) => {
    const num = Number(val);
    return !isNaN(num) && num > 0 && num < 13;
  }, {
    message: "Grade must be a valid number.",
  }),
  age: z.string().refine((val) => {
    const num = Number(val);
    return !isNaN(num) && num > 0;
  }, {
    message: "Age must be a valid number.",
  }),
})

type StudentFormValues = z.infer<typeof studentSchema>;

interface StudentFormProps {
  open: boolean;
  onClose: () => void;
  initialValues?: StudentFormValues;
  studentId?: string;
}

const StudentForm: React.FC<StudentFormProps> = ({
  open,
  onClose,
  initialValues,
  studentId
}) => {
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: initialValues || {
      firstName: '',
      lastName: '',
      email: '',
      grade: '',
      age: '',
    },
    mode: "onChange"
  })

  const handleSubmit = async (values: StudentFormValues) => {
    if (studentId === undefined)
      return;
    (initialValues ? await editStudent(values, studentId) : await createStudent(values))
      .then(() => {
        onClose();
      })
      .catch(() => Error("Operation Failed"))

  };
  return (
    <Dialog open={open} onOpenChange={onClose}> { }
      <DialogTitle>{initialValues ? 'Edit Student' : 'Create New Student'}</DialogTitle>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade</FormLabel>
                  <FormControl>
                    <Input placeholder="Grade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input placeholder="Age" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormMessage /> {/* Global error message */}
          </form>
        </Form>
      </DialogContent>
      <Button variant="outline" onClick={onClose}>Cancel</Button>
      <Button type='submit' onClick={form.handleSubmit(handleSubmit)}>
        {initialValues ? 'Update' : 'Create'}
      </Button>
    </Dialog>
  );

}

export default StudentForm;