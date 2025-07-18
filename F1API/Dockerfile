# Use the official .NET images
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy all csproj files and restore as distinct layers
COPY F1API/F1API.csproj F1API/
COPY Models/Models.csproj Models/
COPY Services/Services.csproj Services/
COPY Repository/Repository.csproj Repository/
COPY DAO/DAO.csproj DAO/

RUN dotnet restore F1API/F1API.csproj

# Copy everything else and build
COPY . .
WORKDIR /src/F1API
RUN dotnet build F1API.csproj -c Release -o /app/build

FROM build AS publish
WORKDIR /src/F1API
RUN dotnet publish F1API.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "F1API.dll"]