import type { UserResponse } from "./userModel";
import { UserModel, type UserLean } from "./userSchema";

export class UserRepository {
  /**
   * Find all users
   */
  async findAllAsync(): Promise<UserResponse[]> {
    const users = await UserModel.find().lean<UserLean[]>();
    return users.map((user) => this.toUserResponse(user));
  }

  /**
   * Find user by ID
   */
  async findByIdAsync(id: string): Promise<UserResponse | null> {
    if (!this.isValidObjectId(id)) {
      return null;
    }
    const user = await UserModel.findById(id).lean<UserLean>();
    return user ? this.toUserResponse(user) : null;
  }

  /**
   * Convert Mongoose lean document to UserResponse DTO
   */
  private toUserResponse(user: UserLean): UserResponse {
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      age: user.age,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  /**
   * Validate MongoDB ObjectId format
   */
  private isValidObjectId(id: string): boolean {
    return /^[0-9a-fA-F]{24}$/.test(id);
  }
}
