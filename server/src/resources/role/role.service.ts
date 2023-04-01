// Import Stores Resources For Stable Work
import RoleModel from '@/resources/role/role.model';

// Create Role Service
class RoleService {
    private role = RoleModel;

    /**
     * Create A New Role
     */
    public async create(
        value: string
    ): Promise<string | object | Error> {
        try {
            // Find Role For Conditions
            const role = await this.role.findOne({ value: value });

            // Conditions For Role
            if (role) {
                throw new Error('Role Already Exists!');
            }

            // If All Successfully then Create New Role
            const newRole = await this.role.create({
                value: value,
            });

            // Return New Role
            return newRole;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default RoleService;
