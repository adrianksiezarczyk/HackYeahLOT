FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-stretch-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch AS build
WORKDIR /src
COPY ["./LOT.Api/LOT.Api.csproj", "LOT.Api/"]
COPY ["./LOT.Services/LOT.Services.csproj", "LOT.Services/"]
RUN dotnet restore "LOT.Api/LOT.Api.csproj"
COPY . .
WORKDIR "/src/LOT.Api"
RUN dotnet build "LOT.Api.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "LOT.Api.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "LOT.Api.dll"]