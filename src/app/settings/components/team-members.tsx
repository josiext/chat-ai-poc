import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function DemoTeamMembers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorias de documentos</CardTitle>
        <CardDescription>
          Categorias en las cuales se van a clasificar los documentos subidos al
          DMS.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" />
              <AvatarFallback>CT</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium leading-none">Contratos</p>
              <p className="text-sm text-muted-foreground">
                Documentos legales
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/02.png" />
              <AvatarFallback>FT</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium leading-none">Facturas</p>
              <p className="text-sm text-muted-foreground">
                Documentos de cuenta financiera
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/02.png" />
              <AvatarFallback>CL</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium leading-none">Clientes</p>
              <p className="text-sm text-muted-foreground">
                Documentos de relacion con clientes
              </p>
            </div>
          </div>
        </div>

        <Button className="w-[100px]">+ Nuevo</Button>
      </CardContent>
    </Card>
  );
}
