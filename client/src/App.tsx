import { StudentTable } from "./components";

const App = () => (
<main className = "relative">
<section className = "" >
    <StudentTable/>
</section>
</main>
);
export default App;
/*
import { lazy, Suspense, useMemo, useState } from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  // createRow,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { type User, fakeData, usStates } from './makeData';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Example = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.firstName,
          helperText: validationErrors?.firstName,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              firstName: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.lastName,
          helperText: validationErrors?.lastName,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              lastName: undefined,
            }),
        },
      },
      {
        accessorKey: 'email',
        header: 'Email',
        muiEditTextFieldProps: {
          type: 'email',
          required: true,
          error: !!validationErrors?.email,
          helperText: validationErrors?.email,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              email: undefined,
            }),
        },
      },
      {
        accessorKey: 'state',
        header: 'State',
        editVariant: 'select',
        editSelectOptions: usStates,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
        },
      },
    ],
    [validationErrors],
  );

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();
  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();
  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

  //CREATE action
  const handleCreateUser: MRT_TableOptions<User>['onCreatingRowSave'] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUser: MRT_TableOptions<User>['onEditingRowSave'] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<User>) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New User</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents} { or render custom edit components here }
          </DialogContent>
          <DialogActions>
            <MRT_EditActionButtons variant="text" table={table} row={row} />
          </DialogActions>
        </>
      ),
      //optionally customize modal content
      renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
        <>
          <DialogTitle variant="h3">Edit User</DialogTitle>
          <DialogContent
            sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {internalEditComponents} {/* or render custom edit components here }
          </DialogContent>
          <DialogActions>
            <MRT_EditActionButtons variant="text" table={table} row={row} />
          </DialogActions>
        </>
      ),
      renderRowActions: ({ row, table }) => (
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Tooltip title="Edit">
            <IconButton onClick={() => table.setEditingRow(row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
      renderTopToolbarCustomActions: ({ table }) => (
        <Button
          variant="contained"
          onClick={() => {
            table.setCreatingRow(true); //simplest way to open the create row modal with no default values
            //or you can pass in a row object to set default values with the `createRow` helper function
            // table.setCreatingRow(
            //   createRow(table, {
            //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
            //   }),
            // );
          }}
        >
          Create New User
        </Button>
      ),
      state: {
        isLoading: isLoadingUsers,
        isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
        showAlertBanner: isLoadingUsersError,
        showProgressBars: isFetchingUsers,
      },
    });
  
    return <MaterialReactTable table={table} />;
  };
  
  //CREATE hook (post new user to api)
  function useCreateUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (user: User) => {
        //send api update request here
        await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
        return Promise.resolve();
      },
      //client side optimistic update
      onMutate: (newUserInfo: User) => {
        queryClient.setQueryData(
          ['users'],
          (prevUsers: any) =>
            [
              ...prevUsers,
              {
                ...newUserInfo,
                id: (Math.random() + 1).toString(36).substring(7),
              },
            ] as User[],
        );
      },
      // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
  }
  
  //READ hook (get users from api)
  function useGetUsers() {
    return useQuery<User[]>({
      queryKey: ['users'],
      queryFn: async () => {
        //send api request here
        await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
        return Promise.resolve(fakeData);
      },
      refetchOnWindowFocus: false,
    });
  }
  
  //UPDATE hook (put user in api)
  function useUpdateUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (user: User) => {
        //send api update request here
        await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
        return Promise.resolve();
      },
      //client side optimistic update
      onMutate: (newUserInfo: User) => {
        queryClient.setQueryData(['users'], (prevUsers: any) =>
          prevUsers?.map((prevUser: User) =>
            prevUser.id === newUserInfo.id ? newUserInfo : prevUser,
          ),
        );
      },
      // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
  }
  
  //DELETE hook (delete user in api)
  function useDeleteUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (userId: string) => {
        //send api update request here
        await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
        return Promise.resolve();
      },
      //client side optimistic update
      onMutate: (userId: string) => {
        queryClient.setQueryData(['users'], (prevUsers: any) =>
          prevUsers?.filter((user: User) => user.id !== userId),
        );
      },
      // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
  }
  
  //react query setup in App.tsx
  const ReactQueryDevtoolsProduction = lazy(() =>
    import('@tanstack/react-query-devtools/build/modern/production.js').then(
      (d) => ({
        default: d.ReactQueryDevtools,
      }),
    ),
  );
  
  const queryClient = new QueryClient();
  
  export default function App() {
    return (
      <QueryClientProvider client={queryClient}>
        <Example />
        <Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </Suspense>
      </QueryClientProvider>
    );
  }
  
  const validateRequired = (value: string) => !!value.length;
  const validateEmail = (email: string) =>
    !!email.length &&
    email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  
  function validateUser(user: User) {
    return {
      firstName: !validateRequired(user.firstName)
        ? 'First Name is Required'
        : '',
      lastName: !validateRequired(user.lastName) ? 'Last Name is Required' : '',
      email: !validateEmail(user.email) ? 'Incorrect Email Format' : '',
    };
  }



  !look

  import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
 
const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];
 
const TABLE_HEAD = ["Member", "Function", "Status", "Employed", ""];
 
const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Organization",
    online: true,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: false,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    job: "Executive",
    org: "Projects",
    online: false,
    date: "19/09/17",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: true,
    date: "24/12/08",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    job: "Manager",
    org: "Executive",
    online: false,
    date: "04/10/21",
  },
];
 
export function SortableTable() {
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Members list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all members
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(
              ({ img, name, email, job, org, online, date }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={img} alt={name} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {job}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {org}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={online ? "online" : "offline"}
                          color={online ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
  
*/