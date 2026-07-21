# gRPC Streaming

Server-side, client-side, and bidirectional streaming in gRPC.

## Stream Types

```protobuf
service StreamService {
    // Server streaming
    rpc ServerStream(Request) returns (stream Response);

    // Client streaming
    rpc ClientStream(stream Request) returns (Response);

    // Bidirectional streaming
    rpc BidiStream(stream Request) returns (stream Response);
}
```

## Server Streaming

```go
func (s *OrderServer) ListOrders(req *pb.ListRequest, stream pb.OrderService_ListOrdersServer) error {
    orders, err := s.repo.FindByUser(stream.Context(), req.UserId)
    if err != nil {
        return status.Errorf(codes.Internal, "find orders: %v", err)
    }
    for _, order := range orders {
        if err := stream.Send(order.ToProto()); err != nil {
            return err
        }
    }
    return nil
}

// Client
func main() {
    client := pb.NewOrderServiceClient(conn)
    stream, err := client.ListOrders(ctx, &pb.ListRequest{UserId: "123"})
    if err != nil {
        log.Fatal(err)
    }
    for {
        order, err := stream.Recv()
        if err == io.EOF {
            break
        }
        if err != nil {
            log.Fatal(err)
        }
        log.Printf("Received order: %s", order.OrderId)
    }
}
```

## Client Streaming

```go
func (s *UploadServer) UploadFile(stream pb.FileService_UploadFileServer) error {
    var fileData bytes.Buffer
    for {
        chunk, err := stream.Recv()
        if err == io.EOF {
            result := processFile(fileData.Bytes())
            return stream.SendAndClose(&pb.UploadResult{
                Size: int64(fileData.Len()),
                Hash: result.Hash,
            })
        }
        if err != nil {
            return err
        }
        fileData.Write(chunk.Data)
    }
}

// Client
func uploadFile(client pb.FileServiceClient, filename string) error {
    stream, err := client.UploadFile(ctx)
    if err != nil {
        return err
    }
    data, _ := os.ReadFile(filename)
    for _, chunk := range splitIntoChunks(data, 64*1024) {
        stream.Send(&pb.FileChunk{Data: chunk})
    }
    result, err := stream.CloseAndRecv()
    if err != nil {
        return err
    }
    log.Printf("Uploaded %d bytes, hash: %s", result.Size, result.Hash)
    return nil
}
```

## Bidirectional Streaming

```go
func (s *ChatServer) Chat(stream pb.ChatService_ChatServer) error {
    for {
        msg, err := stream.Recv()
        if err == io.EOF {
            return nil
        }
        if err != nil {
            return err
        }
        go func(msg *pb.ChatMessage) {
            response := processMessage(msg)
            stream.Send(response)
        }(msg)
    }
}

// Client
func chat(client pb.ChatServiceClient) error {
    stream, err := client.Chat(ctx)
    if err != nil {
        return err
    }
    go func() {
        for {
            msg, err := stream.Recv()
            if err != nil {
                return
            }
            fmt.Printf("%s: %s\n", msg.User, msg.Text)
        }
    }()
    scanner := bufio.NewScanner(os.Stdin)
    for scanner.Scan() {
        stream.Send(&pb.ChatMessage{
            User: "me",
            Text: scanner.Text(),
        })
    }
    stream.CloseSend()
    return nil
}
```

## Practice
1. Build a real-time event stream server
2. Implement progress reporting via server streaming
3. Create a bidirectional game state sync
