# #See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
# USER app
# WORKDIR /app
# EXPOSE 8080
# EXPOSE 8081

# FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
# ARG BUILD_CONFIGURATION=Release
# WORKDIR /src
# COPY ["F1API/F1API.csproj", "F1API/"]
# RUN dotnet restore "./F1API/F1API.csproj"
# COPY . .
# WORKDIR "/src/F1API"
# RUN dotnet build "./F1API.csproj" -c $BUILD_CONFIGURATION -o /app/build

# FROM build AS publish
# ARG BUILD_CONFIGURATION=Release
# RUN dotnet publish "./F1API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# FROM base AS final
# WORKDIR /app
# COPY --from=publish /app/publish .
# ENTRYPOINT ["dotnet", "F1API.dll"]

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["F1API/F1API.csproj", "F1API/"]
RUN dotnet restore "F1API/F1API.csproj"
COPY . .
WORKDIR "/src/F1API"
RUN dotnet build "F1API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "F1API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "F1API.dll"]