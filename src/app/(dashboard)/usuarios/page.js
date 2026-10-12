import { Suspense } from "react";
import { UserDialog } from "@/app/(dashboard)/usuarios/_components/UserDialog";
import { auth } from "@/auth";
import { DeleteButton } from "@/components/common/DeleteButton";
import { Badge } from "@/components/ui/Badge";
import { ContentSkeleton } from "@/components/ui/ContentSkeleton";
import { Field } from "@/components/ui/Field";
import { FilterForm } from "@/components/ui/FilterForm";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pagination } from "@/components/ui/Pagination";
import { Table } from "@/components/ui/Table";
import { formatDate } from "@/lib/format";
import { parseSearchParams, searchQuerySchema } from "@/lib/schemas";
import { listUsers } from "@/lib/services/users";

export const metadata = { title: "Usuarios" };

export default function UsersPage({ searchParams }) {
  return (
    <>
      <PageHeader title="Usuarios" description="Personas con acceso al sistema." actions={<UserDialog />} />
      <Suspense fallback={<ContentSkeleton />}>
        <Users searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function Users({ searchParams }) {
  const params = await searchParams;
  const [{ data, meta }, session] = await Promise.all([listUsers(parseSearchParams(searchQuerySchema, params)), auth()]);
  const isMe = (email) => email === session?.user?.email;

  const columns = [
    {
      key: "name",
      header: "Nombre",
      render: ({ name, email }) => (
        <span className="inline-flex items-center gap-2 font-medium">
          {name}
          {isMe(email) && <Badge tone="brand">Tú</Badge>}
        </span>
      ),
    },
    { key: "email", header: "Correo", className: "text-muted" },
    { key: "createdAt", header: "Alta", className: "whitespace-nowrap text-muted", render: ({ createdAt }) => formatDate(createdAt) },
    {
      key: "actions",
      header: <span className="sr-only">Acciones</span>,
      render: (user) => (
        <div className="flex justify-end gap-1">
          <UserDialog user={user} />
          {!isMe(user.email) && <DeleteButton path={`/user/${user.id}`} title="Eliminar usuario" name={user.name} />}
        </div>
      ),
    },
  ];

  return (
    <>
      <FilterForm action="/usuarios">
        <Field label="Buscar" className="min-w-64 flex-1">
          <Input name="search" type="search" defaultValue={params.search} placeholder="Nombre o correo" />
        </Field>
      </FilterForm>
      <Table columns={columns} rows={data} empty="No hay usuarios" />
      <Pagination meta={meta} params={params} />
    </>
  );
}
