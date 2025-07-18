FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY F1API.csproj ./
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