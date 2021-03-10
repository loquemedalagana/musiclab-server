import { SetMetadata } from '@nestjs/common';
import { RoleCategory } from 'src/entities/user/role.entity';

export type AlloedRoles = keyof typeof RoleCategory | 'Member' | 'Any';

export const ROLES_KEY = 'roles';
export const Roles = (roles: AlloedRoles[]) => SetMetadata(ROLES_KEY, roles);
