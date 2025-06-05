<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ProductController extends AbstractController
{
    #[Route('/api/products', name: 'create_product', methods: ['POST'])]
    public function createProduct(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['name'], $data['price'], $data['image'])) {
            return new JsonResponse(['error' => 'Datos incompletos'], 400);
        }

        $product = new Product();
        $product->setName($data['name']);
        $product->setPrice((float) $data['price']);
        $product->setImage($data['image']);
        $product->setTalla($data['talla'] ?? null);
        $product->setDisponible($data['disponible'] ?? true);

        $em->persist($product);
        $em->flush();

        return new JsonResponse([
            'message' => 'Producto creado',
            'producto' => [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'price' => $product->getPrice(),
                'image' => $product->getImage(),
                'talla' => $product->getTalla(),
                'disponible' => $product->isDisponible(),
            ]
        ], 201);
    }

    #[Route('/api/products', name: 'get_products', methods: ['GET'])]
    public function getProducts(ProductRepository $productRepository): JsonResponse
    {
        $products = $productRepository->findAll();

        $data = array_map(function (Product $product) {
            return [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'price' => $product->getPrice(),
                'image' => $product->getImage(),
                'talla' => $product->getTalla(),
                'disponible' => $product->isDisponible(),
            ];
        }, $products);

        return new JsonResponse($data);
    }

    #[Route('/api/products/{id}', name: 'update_product', methods: ['PATCH'])]
    public function updateProduct(Request $request, Product $product, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['disponible'])) {
            $product->setDisponible((bool) $data['disponible']);
        }

        if (isset($data['price'])) {
            $product->setPrice((float) $data['price']);
        }

        if (isset($data['talla'])) {
            $product->setTalla($data['talla']);
        }

        $em->flush();

        return new JsonResponse(['message' => 'Producto actualizado']);
    }
    #[Route('/api/products/{id}', name: 'delete_product', methods: ['DELETE'])]
    public function deleteProduct(Product $product, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($product);
        $em->flush();

        return new JsonResponse(['message' => 'Producto eliminado']);
    }

}

